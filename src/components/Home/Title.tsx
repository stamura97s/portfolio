import { css, keyframes } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons'

/*================================================
 Functions
================================================*/
const smoothScroll = (targetId: string) => {
  const target = document.getElementById(targetId)
  if (!target) return

  const { top } = target.getBoundingClientRect()
  window.scrollTo({
    top: top + window.scrollY,
    behavior: 'smooth',
  })
}

/*================================================
 Component
================================================*/
export const Title = () => {
  return (
    <section id="home">
      <div css={styles.titleWrapper}>
        <h1 css={styles.title}>
          <span>S</span>
          <span>h</span>
          <span>o</span>
          <span>&apos;</span>
          <span>s</span>
          <span>&nbsp;</span>
          <span>P</span>
          <span>o</span>
          <span>r</span>
          <span>t</span>
          <span>f</span>
          <span>o</span>
          <span>l</span>
          <span>i</span>
          <span>o</span>
        </h1>
        <p css={styles.titleDesc}>WEB ENGINEER</p>
        <a onClick={() => smoothScroll('about')} css={styles.downIcon}>
          <FontAwesomeIcon icon={faAnglesDown} fade style={{ color: '#fff' }} />
        </a>
      </div>
    </section>
  )
}

/*================================================
 Styling
================================================*/
const anims = {
  fadeUp: keyframes`
    from {
        opacity: 0;
        transform: translateY(100px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
  `,
}

const styles = {
  titleWrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 100vh;
    text-shadow: 0 5px 10px rgba(128, 128, 128, 0.5);
  `,
  title: css`
    display: flex;
    overflow: hidden;
    margin: 0;
    font-size: min(10vw, 96px);
    font-family: 'Pacifico';
    span {
      display: block;
      animation: ${anims.fadeUp} 0.5s backwards;
    }
    span:nth-of-type(1) {
      animation-delay: 0.1s;
    }
    span:nth-of-type(2) {
      animation-delay: 0.2s;
    }
    span:nth-of-type(3) {
      animation-delay: 0.3s;
    }
    span:nth-of-type(4) {
      animation-delay: 0.4s;
    }
    span:nth-of-type(5) {
      animation-delay: 0.5s;
    }
    span:nth-of-type(6) {
      animation-delay: 0.6s;
    }
    span:nth-of-type(7) {
      animation-delay: 0.7s;
    }
    span:nth-of-type(8) {
      animation-delay: 0.8s;
    }
    span:nth-of-type(9) {
      animation-delay: 0.9s;
    }
    span:nth-of-type(10) {
      animation-delay: 1s;
    }
    span:nth-of-type(11) {
      animation-delay: 1.1s;
    }
    span:nth-of-type(12) {
      animation-delay: 1.2s;
    }
    span:nth-of-type(13) {
      animation-delay: 1.3s;
    }
    span:nth-of-type(14) {
      animation-delay: 1.4s;
    }
    span:nth-of-type(15) {
      animation-delay: 1.5s;
    }
  `,
  titleDesc: css`
    font-size: min(5vw, 48px);
    animation: ${anims.fadeUp} 1s backwards;
    animation-delay: 1.6s;
  `,
  downIcon: css`
    position: absolute;
    bottom: 0;
    font-size: 3em;
  `,
}
