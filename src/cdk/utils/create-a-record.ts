import {RestApi} from '@aws-cdk/aws-apigateway';
import {ARecord, HostedZone, RecordTarget} from '@aws-cdk/aws-route53';
import {ApiGateway} from '@aws-cdk/aws-route53-targets';
import {Stack} from '@aws-cdk/core';
import {StackConfig} from '../../types';

export function createARecord(
  stackConfig: StackConfig,
  stack: Stack,
  restApi: RestApi
): void {
  const {customDomainConfig} = stackConfig;

  if (!customDomainConfig) {
    return;
  }

  const {hostedZoneId, hostedZoneName, aliasRecordName} = customDomainConfig;

  const aRecord = new ARecord(stack, 'ARecord', {
    zone: HostedZone.fromHostedZoneAttributes(stack, 'HostedZone', {
      hostedZoneId,
      zoneName: hostedZoneName
    }),
    recordName: aliasRecordName,
    target: RecordTarget.fromAlias(new ApiGateway(restApi))
  });

  aRecord.node.addDependency(restApi);
}
