#### 1. Step - build image

`docker build -t training .`

#### 2. Step - run image locally

`docker run -e AZURE_CLIENT_ID="<client-id>" -e AZURE_TENANT_ID="<tenant-id>" -e` 
`AZURE_CLIENT_SECRET="client-secret" -e  NAME="<name>" -e  NUM=10 training:latest`

#### 3. Step - login to ACR

`docker login <login-server> -u <username> -p <password>`

#### 4. Step - tag image

`docker tag training:latest <server-login>/training:ts`

#### 5. Step - push image to ACR

`docker push <server-login>/training:ts`

#### 6. Step - create Azure Container Instance

`az container create -g <resource-group> --name training --image <server-login>/training:latest --memory 1 --restart-policy never --secure-environment-variables AZURE_CLIENT_ID='<client-id>' AZURE_CLIENT_SECRET='<client-secret>' AZURE_TENANT_ID='<tenant-id>’ –environment-variables NAME='<name>' NUM=10`