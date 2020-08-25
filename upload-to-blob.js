
const { SecretClient } = require('@azure/keyvault-secrets');
const { ClientSecretCredential } = require("@azure/identity");
const { BlobServiceClient } = require('@azure/storage-blob');
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID; 
const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID; 
const AZURE_CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET; 
const NAME = process.env.NAME;
const NUM = process.env.NUM;
const vaultName = "dockertrainingkv";
const url = `https://${vaultName}.vault.azure.net`;
const secretName = "azure-connection";


async function main() {
    console.log('***** Docker training sample *****');

    const credential = new ClientSecretCredential(AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET);
    const client = new SecretClient(url, credential);
    const secret = await client.getSecret(secretName);
    //console.log(`Your secret value is: ${secret.value}`);
    //console.log('Azure connection string: ' + secret.value);

    // Create the BlobServiceClient object which will be used to create a container client
    const blobServiceClient = BlobServiceClient.fromConnectionString(secret.value);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient('training');

    if (NUM <= 10) {
        // Create a unique name for the blob
        const blobName = NAME + '.txt';//uuidv1() + '.txt';

        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        console.log('\nUploading to Azure storage as blob:\n\t', blobName);

        // Upload data to the blob
        const data = 'Hello, ' + NAME.charAt(0).toUpperCase() + NAME.slice(1);
        const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
        console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

        console.log('\nListing blobs...');

        // List the blob(s) in the container.
        for await (const blob of containerClient.listBlobsFlat()) {
            console.log('\t', blob.name);
        }
    } else console.log("NUM is bigger that 10.");

}

main().then(() => console.log('Done')).catch((ex) => console.log(ex.message));