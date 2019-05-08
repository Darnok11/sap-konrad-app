# Windows curl = Invoke-WebRequest https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-5.1

# Before run script check if ExecutionPolicy is set to RemoteSigned by command Get-ExecutionPolicy (propably Restricted) and save it to restore later!
# If it is not than change it by command Set-ExecutionPolicy RemoteSigned.

$uri = "http://localhost:4000/graphql/"
$movie = '{ "query": "{ movies(id: \"03de7fa801753b7adde3\") { id title } }" }'
$movies = '{ "query": "{ movies(start: 2, end: 5) { id title } }" }'
$list = '{ "query": "{ movies { id title } }" }'
$count = '{ "query": "{ count }" }'

$queries = @($movie, $movies, $list, $count)

# single test
# curl -Uri $uri -Method POST -ContentType: application/json -Body $list

# test all
For ($i=0; $i -lt $queries.Length; $i++) {
	curl -Uri $uri -Method POST -ContentType: application/json -Body $queries[$i]
}
