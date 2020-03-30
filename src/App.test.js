import { render } from '@testing-library/react'
import React from 'react'

import App from './App'

// test('renders map element', () => {
//   const { getByTestId } = render(<App />)
//   const map = getByTestId('map')
//   expect(map).toBeInTheDocument()
// })

test('google maps api key not null', () => {
  expect(process.env.REACT_APP_GOOGLE_MAPS_API_KEY).not.toBe(null)
})
