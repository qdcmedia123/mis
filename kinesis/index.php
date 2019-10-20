<?php
require 'vendor/autoload.php';
use Aws\Kinesis\KinesisClient; 
use Aws\Exception\AwsException;

/* Access ID
AWSAccessKeyId=AKIAIKGMO3BULUPAUZQA
AWSSecretKey=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

Access*/
$key = 'AKIAIKGMO3BULUPAUZQA';
$secret = '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';

$kinesisClient = new Aws\Kinesis\KinesisClient([
    'version' => '2013-12-02',
    'region' => 'us-east-2',
    'credentials' => [
            'key' => $key,
            'secret' => $secret,
    ]

]);

// Create stream name and count 
$shardCount = 2;
$name = "my_stream_name";
/*

try {
    $result = $kinesisClient->createStream([
        'ShardCount' => $shardCount,
        'StreamName' => $name,
    ]);
    echo "<pre>";
    print_R($result);
    echo "</pre>";
    
} catch (AwsException $e) {
    // output error message if fails
    echo $e->getMessage();
    echo "\n";
}*/

// Send Data to an Existing Data Stream

/*$name = "my_stream_name";
$content = '{"ticker_symbol":"QXZ", "sector":"HEALTHCARE", "change":-0.05, "price":84.51}';
$groupID = "input to a hash function that maps the partition key (and associated data) to a specific shard";

try {
    $result = $kinesisClient->PutRecord([
        'Data' => $content,
        'StreamName' => $name,
        'PartitionKey' => $groupID
    ]);
    print("<p>ShardID = " . $result["ShardId"] . "</p>");
    
    var_dump($result);
} catch (AwsException $e) {
    // output error message if fails
    echo $e->getMessage();
    echo "\n";
}*/


//List Existing Data Streams That Are Connected to Kinesis

/*try {
    $result = $kinesisClient->listStreams([
    ]);
    echo "<pre>";
    print_R($result);
    echo "</pre>";
    var_dump($result);
} catch (AwsException $e) {
    // output error message if fails
    echo $e->getMessage();
    echo "\n";
}*/


// get records 
$numberOfRecordsPerBatch = 10;


$res = $kinesisClient->describeStream([ 'StreamName' => $name ]);

$shardIds = $res->search('StreamDescription.Shards[].ShardId');

$count = 0;
$startTime = microtime(true);
foreach ($shardIds as $shardId) {
    echo "ShardId: $shardId\n";
    // get initial shard iterator
    $res = $kinesisClient->getShardIterator([
        'ShardId' => $shardId,
        'ShardIteratorType' => 'TRIM_HORIZON', // 'AT_SEQUENCE_NUMBER|AFTER_SEQUENCE_NUMBER|TRIM_HORIZON|LATEST'
        // 'StartingSequenceNumber' => '<string>',
        'StreamName' => $name,
    ]);
    $shardIterator = $res->get('ShardIterator');
    do {
        echo "Get Records\n";
        $res = $kinesisClient->getRecords([
            'Limit' => $numberOfRecordsPerBatch,
            'ShardIterator' => $shardIterator
        ]);
        $shardIterator = $res->get('NextShardIterator');
        $behind = $res->get('MillisBehindLatest');
        $localCount = 0;
        foreach ($res->search('Records[].[SequenceNumber, Data]') as $data) {
            list($sequenceNumber, $item) = $data;
            echo "- [$sequenceNumber]\n";
            $count++;
            $localCount++;
        }
        echo "Processed $localCount records in this batch\n";
        //sleep(1);
    } while ($behind>0 && $shardIterator != '');
}



$duration = microtime(true) - $startTime;
$timePerMessage = $duration*1000 / $count;
echo "Total Messages: " . $count . "\n";
echo "Total Duration: " . round($duration) . " seconds\n";
echo "Time per message: " . round($timePerMessage, 2) . " ms/message\n";
