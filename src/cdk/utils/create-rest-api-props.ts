import {RestApiProps} from '@aws-cdk/aws-apigateway';
import {Stack} from '@aws-cdk/core';
import {StackConfig} from '../../types';
import {createDomainNameOptions} from './create-domain-name-options';
import {createStageOptions} from './create-stage-options';

export function createRestApiProps(
  resourceName: string,
  stackConfig: StackConfig,
  stack: Stack
): RestApiProps {
  const {binaryMediaTypes, minimumCompressionSizeInBytes} = stackConfig;

  return {
    restApiName: resourceName,
    domainName: createDomainNameOptions(stackConfig, stack),
    binaryMediaTypes,
    minimumCompressionSize: minimumCompressionSizeInBytes,
    deployOptions: createStageOptions(stackConfig)
  };
}
