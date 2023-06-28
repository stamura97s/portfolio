import { useCallback } from 'react'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'

import config from '../../assets/bgconfig.json'

/*================================================
 Component
================================================*/
export const Background = () => {
  const options = config as typeof config

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  return <Particles id="tsparticles" init={particlesInit} options={options as any} />
}
