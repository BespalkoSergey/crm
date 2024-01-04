# Get short version of commit
$short_sha = $env:GITHUB_SHA.Substring(0, 7)

# Define the content what need to write to the file
$envContent = @"
PORT=$env:APP_PORT
HOSTNAME=$env:APP_HOSTNAME
GIT_COMMIT=$env:GITHUB_SHA
"@

# Write the content to a new .env file
$envContent | Set-Content -Path "dist/.env"
