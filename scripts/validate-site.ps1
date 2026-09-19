$ErrorActionPreference = "Stop"

# Run every check from the repository root so relative asset paths resolve consistently.
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

# Return values for a simple HTML attribute. This is intentionally small and is not a full HTML parser.
function Get-AttributeValues {
    param (
        [string]$Markup,
        [string]$Attribute
    )

    $pattern = '{0}="([^"]+)"' -f $Attribute

    [regex]::Matches($Markup, $pattern) |
        ForEach-Object { $_.Groups[1].Value }
}

# These are the pages that make up the current static site.
$htmlFiles = @("index.html", "about.html")

foreach ($htmlFile in $htmlFiles) {
    if (-not (Test-Path $htmlFile)) {
        throw "Missing required page: $htmlFile"
    }

    # Validate fragment links and local images before checking JavaScript.
    $markup = Get-Content -Raw $htmlFile
    $ids = Get-AttributeValues -Markup $markup -Attribute "id"
    $internalTargets = Get-AttributeValues -Markup $markup -Attribute "href" |
        Where-Object { $_ -like "#*" -and $_ -ne "#" } |
        ForEach-Object { $_.TrimStart("#") }

    foreach ($target in $internalTargets) {
        if ($target -notin $ids) {
            throw "$htmlFile points to a missing anchor: #$target"
        }
    }

    $localImages = Get-AttributeValues -Markup $markup -Attribute "src" |
        Where-Object { $_ -notmatch "^https?://" }

    foreach ($image in $localImages) {
        if (-not (Test-Path $image)) {
            throw "$htmlFile references a missing asset: $image"
        }
    }

    Write-Output "PASS $htmlFile"
}

# Node is optional for the static site, but syntax checking is useful when it is installed.
if (Get-Command node -ErrorAction SilentlyContinue) {
    node --check script.js
    Write-Output "PASS script.js"
} else {
    Write-Warning "Node.js is not installed; skipped JavaScript syntax validation."
}

Write-Output "Site validation completed successfully."
