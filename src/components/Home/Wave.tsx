import { useEffect, useRef } from 'react'
import { css } from '@emotion/react'

/*================================================
 Functions
================================================*/
/**
 * Draw wave animation function.
 */
function drawWave(canvas: HTMLCanvasElement, timer: number): void {
  /**
   * Draw sine function.
   */
  function drawSine(): void {
    const unit = 50
    const zoom = 3
    const xAxis = Math.floor(canvas.height / 2)
    const yAxis = 0
    let x = timer
    let y = Math.sin(x) / zoom

    context.moveTo(yAxis, unit * y + xAxis)
    for (let i = yAxis; i <= canvas.width + 10; i += 10) {
      x = timer + (-yAxis + i) / unit / zoom
      y = Math.sin(x) / zoom
      context.lineTo(i, unit * y + xAxis)
    }
  }

  // Canvasのコンテキストを取得
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  // Canvasの描画をクリア
  context.clearRect(0, 0, canvas.width, canvas.height)
  // 描画設定
  context.strokeStyle = '#fff'
  context.lineWidth = 10
  context.globalAlpha = 0.5
  // 波を描画
  context.beginPath()
  drawSine()
  context.stroke()
}

/*================================================
 Component
================================================*/
export const Wave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // nullでないことを確認
    if (!canvasRef.current) return
    // Canvas設定
    const canvas = canvasRef.current
    canvas.width = document.documentElement.clientWidth
    canvas.height = 50
    // 描画情報
    let seconds = 0
    let timer = 0

    const timeoutId = setInterval(() => {
      // 波を描画
      drawWave(canvas, timer)
      // 描画情報の更新
      seconds += 0.01
      timer = seconds * Math.PI
    }, 25)
    return () => clearInterval(timeoutId)
  }, [])

  return (
    <div css={styles.wave}>
      <canvas ref={canvasRef} />
    </div>
  )
}

/*================================================
 Styling
================================================*/
const styles = {
  wave: css`
    position: relative;
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
  `,
}
