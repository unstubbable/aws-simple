import {CloudFormation} from 'aws-sdk';
import React from 'react';
import {AppConfigContext} from '../contexts/app-config-context';
import {ClientConfigContext} from '../contexts/client-config-context';
import {AppConfig} from '../types';
import {AppInfo} from './app-info';
import {ListCommand} from './list-command';
import {TagCommand} from './tag-command';

export interface UiProps {
  readonly appConfig: AppConfig;
  readonly clientConfig: CloudFormation.ClientConfiguration;
  readonly argv: {readonly _: string[]};
}

export const Ui = ({appConfig, clientConfig, argv}: UiProps): JSX.Element => (
  <>
    <AppInfo appConfig={appConfig} />
    <AppConfigContext.Provider value={appConfig}>
      <ClientConfigContext.Provider value={clientConfig}>
        <ListCommand argv={argv} />
        <TagCommand argv={argv} />
      </ClientConfigContext.Provider>
    </AppConfigContext.Provider>
  </>
);
