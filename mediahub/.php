<?php
// Configuration for MovieWorld
$apiToken = getenv('CLOUDFLARE_API_TOKEN'); // Set this in your environment - never hardcode tokens
$accountId = getenv('CLOUDFLARE_ACCOUNT_ID'); // Set this in your environment - never hardcode IDs
$databaseId = getenv('CLOUDFLARE_DATABASE_ID'); // Set this in your environment - never hardcode IDs

$query = "SELECT * FROM movies LIMIT 10;";

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.cloudflare.com/client/v4/accounts/$accountId/d1/database/$databaseId/query");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['sql' => $query]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiToken",
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);

// Check if the query was successful
if ($data['success']) {
    $movies = $data['result'][0]['results'];
    foreach ($movies as $movie) {
        echo "Movie: " . $movie['title'] . " (" . $movie['release_year'] . ")<br>";
    }
} else {
    echo "Error connecting to MovieWorld database.";
}
?>