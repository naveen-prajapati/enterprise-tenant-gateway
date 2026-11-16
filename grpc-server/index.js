import path from 'path';
import { fileURLToPath } from 'url';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import validateToken from './tokenValidation.js'
import getTenantConfig from './getTenantConfig.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Path to your proto file
const PROTO_PATH = path.join(__dirname, 'protos', 'auth.proto');

// 2. Load the proto file options
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// 3. Load the package definition into gRPC
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const authPackage = protoDescriptor.auth;


// 5. Start the gRPC Server
export default function grcpServer() {
  const server = new grpc.Server();
  server.addService(authPackage.AuthService.service,{
    ValidateToken: validateToken,
    GetTenantConfig: getTenantConfig
  })

  const serverAddress = '0.0.0.0:50051';
  server.bindAsync(
    serverAddress,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error('Failed to bind server:', error);
        return;
      }
      console.log(`gRPC server running at http://${serverAddress}`);
    }
  );
}
