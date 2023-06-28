import { css } from '@emotion/react'

/*================================================
 Functions
================================================*/
/**
 * 時刻表示を反映する関数
 */
export const adjustClock = (h: number, m: number) => {
  // デジタル表示
  const timeElem = document.querySelector('.time') as HTMLElement
  if (timeElem) {
    const zeroPadding = (n: number) => (n < 10 ? '0' + n.toString() : n.toString())
    timeElem.textContent = zeroPadding(h) + ':' + zeroPadding(m)
  }

  // アナログ表示
  const shortElem = document.querySelector('.short') as HTMLElement
  const longElem = document.querySelector('.long') as HTMLElement
  if (shortElem && longElem) {
    // 短針の角度
    const shortDeg = h < 13 ? h * 30 + (m / 60) * 30 : (h - 12) * 30 + (m / 60) * 30
    shortElem.style.transform = 'rotate(' + shortDeg + 'deg) translateY(5px)'
    // 長針の角度
    const longDeg = m * 6
    longElem.style.transform = 'rotate(' + longDeg + 'deg) translateY(5px)'
  }
}

/*================================================
 Component
================================================*/
export const Clock = () => {
  return (
    <div css={clockStyles}>
      <div className="circle">
        <div className="digital">
          <div className="time"></div>
        </div>
        <div className="analog">
          <div className="short"></div>
          <div className="long"></div>
          <div className="center"></div>
          <ul>
            <li className="zero"></li>
            <li className="one"></li>
            <li className="two"></li>
            <li className="three"></li>
            <li className="four"></li>
            <li className="five"></li>
            <li className="six"></li>
            <li className="seven"></li>
            <li className="eight"></li>
            <li className="nine"></li>
            <li className="ten"></li>
            <li className="eleven"></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

/*================================================
 Styling
================================================*/
const clockStyles = css`
  width: 100%;
  height: 100%;

  .circle {
    position: relative;
    top: 50%;
    left: 50%;

    .digital {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-50%, 150%);
    }

    .analog {
      transform: translateX(-5px);

      .short,
      .long {
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        position: absolute;
        bottom: 0;
        left: 0;
        transform-origin: min(0.5vw, 0.5vh) bottom;
        width: min(1vw, 1vh);
        background-color: #808080;
      }
      .short {
        z-index: 2;
        height: min(15vw, 15vh);
      }
      .long {
        z-index: 1;
        height: min(30vw, 30vh);
      }
      .center {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        z-index: 3;
        width: min(1vw, 1vh);
        aspect-ratio: 1;
        border-radius: 50%;
        background-color: #ccc;
      }

      ul {
        li {
          position: absolute;
          bottom: 0;
          left: 0;
          transform-origin: bottom;
          width: min(2vw, 2vh);
          height: min(45vw, 45vh);
          background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 21%);
        }

        .one {
          transform: rotate(30deg);
        }
        .two {
          transform: rotate(60deg);
        }
        .three {
          transform: rotate(90deg);
        }
        .four {
          transform: rotate(120deg);
        }
        .five {
          transform: rotate(150deg);
        }
        .six {
          transform: rotate(180deg);
        }
        .seven {
          transform: rotate(210deg);
        }
        .eight {
          transform: rotate(240deg);
        }
        .nine {
          transform: rotate(270deg);
        }
        .ten {
          transform: rotate(300deg);
        }
        .eleven {
          transform: rotate(330deg);
        }
      }
    }
  }
`
