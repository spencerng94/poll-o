import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import React from 'react';
import App from './src/App';

import Constants from "expo-constants";
const { manifest } = Constants;

const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;

const ignoreConsoleMessages = [
    'Running "main" with'
  ]
  const origLog = console.log
  console.log = (...params) => (
    typeof params[0] === 'string' &&
    ignoreConsoleMessages.reduce((acc, i) => acc + ~params[0].indexOf(i), 0)
      ? null
      : origLog(...params)
  )

registerRootComponent(App);