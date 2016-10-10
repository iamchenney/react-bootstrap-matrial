import React from 'react';
import {render} from 'react-dom';
import injectTabEventPlugin from 'react-tap-event-plugin'

import Hello from './components/Hello'
import LikeButton from './components/LikeButton'

injectTabEventPlugin()

render(
  (<div><Hello /> <LikeButton /> </div>),
  document.getElementById('app'))
