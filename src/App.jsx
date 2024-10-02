import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import { GuideSelection } from './components/guide-selection'
import { SelectedGuidesList } from './components/selected-guides-list'
import GuideAllocationPage from './components/guide-allocation-page'


function App() {
  return (
    <GuideAllocationPage />

  );
}

export default App