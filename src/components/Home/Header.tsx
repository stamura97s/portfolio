import { useEffect, useState } from 'react'
import { css } from '@emotion/react'

/*================================================
 Variables
================================================*/
const menu = [
  { id: 'home', display: false },
  { id: 'about', display: false },
  { id: 'works', display: false },
  { id: 'contact', display: false },
]

/*================================================
 Functions
================================================*/
const smoothScroll = (targetId: string) => {
  const target = document.getElementById(targetId)
  if (!target) return

  const { top } = target.getBoundingClientRect()
  window.scrollTo({
    top: top + window.scrollY + 1,
    behavior: 'smooth',
  })
}

/*================================================
 Component
================================================*/
export const Header = () => {
  // スタイル変更時に再レンダリングさせるためuseStateを設定
  const [menuList, setMenuList] = useState(menu)
  // IntersectionObserverオブジェクトのオプション値
  const options = {
    root: null,
    rootMargin: '0px 0px -50% 0px',
    threshold: 0,
  }

  useEffect(() => {
    // 監視対象がviewPortに入った時のコールバック関数
    const callback = (entries: IntersectionObserverEntry[]) => {
      // 監視領域に入った監視対象（IntersectionObserverEntity）を取得
      const entry = entries.find((entry: IntersectionObserverEntry) => entry.isIntersecting)
      // ある場合にuseStateを更新
      if (entry) {
        setMenuList(
          menuList.map((prev) => {
            if (prev.id === entry.target.id) {
              return { ...prev, display: true }
            } else {
              return { ...prev, display: false }
            }
          })
        )
      }
    }

    // IntersectionObserverオブジェクトの作成
    const observer = new IntersectionObserver(callback, options)
    // // domから監視対象を取得
    const targets = Array.from(document.querySelectorAll('section'))
    // 監視対象をオブジェクトにセットする
    targets.forEach((terget) => observer.observe(terget))
  }, [])

  return (
    <header css={styles.header}>
      <nav css={styles.nav}>
        <ul css={styles.menuList}>
          {menuList.map((menu) => (
            <li key={menu.id}>
              <a onClick={() => smoothScroll(menu.id)} css={[styles.menuLink, targetStyle(menu.display)]}>
                {menu.id}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

/*================================================
 Styling
================================================*/
const styles = {
  header: css`
    position: fixed;
    z-index: 999;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    font-size: 1rem;
    text-align: center;
    transition: all 0.5s;
  `,
  nav: css`
    max-width: 768px;
    margin: 1em auto;
  `,
  menuList: css`
    display: flex;
    justify-content: space-around;
  `,
  menuLink: css`
    display: block;
    position: relative;
    padding: 0.5em;
    color: #fff;
    text-transform: uppercase;
    transition: all 0.5s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      color: inherit;
    }
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, #fff, #fff, rgba(0, 145, 255, 0)) 200% 0 / 200% 2px no-repeat,
        linear-gradient(to bottom, #fff, #fff, rgba(0, 145, 255, 0)) 100% 200% / 2px 200% no-repeat,
        linear-gradient(to left, #fff, #fff, rgba(0, 145, 255, 0)) -200% 100% / 200% 2px no-repeat,
        linear-gradient(to top, #fff, #fff, rgba(0, 145, 255, 0)) 0 -200% / 2px 200% no-repeat;
      content: '';
      transition: background-position 0.5s;
    }
  `,
}

const targetStyle = (display: boolean) => {
  if (display) {
    return css`
      &:before {
        background-position: 0 0, 100% 0, 100% 100%, 0 100%;
      }
    `
  }
}
