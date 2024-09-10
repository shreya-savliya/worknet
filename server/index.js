import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import typeDefs from './EmployeeSchema.js';
import resolvers from './EmployeeResolver.js';

const createServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = express();
  app.use(cors());
  server.applyMiddleware({ app });

  app.listen({ port: 7000 }, () =>
    console.log(`Server ready at http://localhost:7000${server.graphqlPath}`)
  );
};
createServer();
