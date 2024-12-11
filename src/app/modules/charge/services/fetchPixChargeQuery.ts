import { createPromiseWithResolvers } from '../../../../common/createPromiseWithResolvers'
import { config } from '../../../../config/config'
import { GetPixChargeByCorrelationIDQuery } from '../queries/graphql/GetPixChargeByCorrelationIDQuery'
// correlationID = "2A3lZN4Nj2EY6bEUBtYbxyvRrLk1gf"
export const fetchPixChargeQuery = async (
  correlationID: string,
  appID: string
) => {
  const { promise, resolve } = createPromiseWithResolvers()

  fetch(config.graphqlURL, {
    method: 'POST',
    body: JSON.stringify({
      name: 'PixDialogGetChargeQuery',
      operationName: 'PixDialogGetChargeQuery',
      query: GetPixChargeByCorrelationIDQuery,
      variables: {
        correlationID
      }
    }),
    mode: 'cors',
    headers: {
      Authorization: appID,
      'Content-Type': 'application/json'
    }
  })
    .then((r) => r.json())
    .then(resolve)
    .catch(() => resolve(null))

  return promise
}
