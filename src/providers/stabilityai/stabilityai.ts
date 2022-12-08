import { grpc } from '@improbable-eng/grpc-web'
import GenerationService from './generation_pb_service'

import { stabilityAIApiToken, stabilityAIApiToURL } from '../../config'

// Authenticate using your API key, don't commit your key to a public repository!
export const metadata = new grpc.Metadata()
metadata.set('Authorization', 'Bearer ' + stabilityAIApiToken)

// Create a generation client
export const generationClient = new GenerationService.GenerationServiceClient(
  stabilityAIApiToURL,
  {}
)
