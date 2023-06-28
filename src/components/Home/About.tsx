import { css } from '@emotion/react'
import { Wave } from './Wave'

/*================================================
 Variables
================================================*/
const timelineData = [
  {
    title: '情報系大学',
    period: '2016年4月〜',
    description:
      'コンピュータの基礎知識に始まり、プログラミング言語、データベース、ネットワーク、情報セキュリティなど、情報技術に関する基礎知識を学習し、基本情報技術者の資格を取得。' +
      'チームメンバーで協力してプロジェクトを進める実践的な演習にも取り組み、問題解決能力やチーム開発での協調性を養う。',
    technologies: [
      'cplusplus/cplusplus-original.svg',
      'java/java-original.svg',
      'python/python-original.svg',
      'html5/html5-original.svg',
      'css3/css3-original.svg',
      'mysql/mysql-original.svg',
    ],
  },
  {
    title: 'Webシステム/アプリ開発会社',
    period: '2020年4月〜',
    description:
      'PHP(特にLaravelフレームワーク)を使用したWebシステムのバックエンド開発をメインに担当。ウォーターフォール型の開発手法で、設計から運用保守まで幅広く経験。' +
      'その他、顧客管理システム(CRM)を活用したデータ分析に携わり、必要な情報をデータベースから抽出・加工するSQLスキルを磨く。',
    technologies: [
      'php/php-original.svg',
      'laravel/laravel-plain.svg',
      'mysql/mysql-original.svg',
      'amazonwebservices/amazonwebservices-original.svg',
    ],
  },
  {
    title: 'フリーランスエンジニア',
    period: '2021年10月〜',
    description:
      'Pythonを使用した、反復的なデジタル業務プロセスを自動化するためのソフトウェアツール(RPAツール)の開発に従事。その過程で、APIやスクレイピングなどの情報取得に関する技術を習得。' +
      'WordPressを用いたWebサイト制作のプロジェクトにも携わるようになり、フロントエンド開発に興味を持つ。',
    technologies: [
      'python/python-original.svg',
      'php/php-original.svg',
      'javascript/javascript-original.svg',
      'html5/html5-original.svg',
      'css3/css3-original.svg',
    ],
  },
]

/*================================================
 Component
================================================*/
export const About = () => {
  return (
    <section id="about" css={timelineStyles.section}>
      <Wave />
      <div className="wrapper">
        <h2>About</h2>
        <ul css={timelineStyles.list}>
          {timelineData.map((timeline, index) => (
            <li key={index} css={timelineStyles.listItem}>
              <label css={timelineStyles.icon} className="hover-item"></label>
              <div css={timelineStyles.content}>
                <p css={timelineStyles.period} className="hover-item">
                  {timeline.period}
                </p>
                <h3>{timeline.title}</h3>
                <p>{timeline.description}</p>
                <hr />
                <h4>▼Technologies</h4>
                <ul css={timelineStyles.technologies}>
                  {timeline.technologies.map((technology, index) => (
                    <li key={index}>
                      <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${technology}`} />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/*================================================
 Styling
================================================*/
enum Colors {
  Color1 = '#fff',
  Color2 = '#333',
  Color3 = '#ff8600',
}

const timelineStyles = {
  section: css`
    // background-color: rgba(94, 195, 235, 0.5);
  `,
  list: css`
    max-width: 768px;
    margin: 4em auto;
  `,
  listItem: css`
    position: relative;
    margin-bottom: 4em;
    &:before {
      content: '';
      position: absolute;
      top: 2.5em;
      left: -1px;
      width: 2px;
      height: 0%;
      background-color: ${Colors.Color1};
      transition: all 1s ease-in-out;
    }
    &:hover {
      &:before,
      .hover-item {
        background-color: ${Colors.Color3};
        color: ${Colors.Color1};
      }
      &:before {
        height: 100%;
      }
      label.hover-item {
        transform: rotate(315deg);
      }
    }
  `,
  content: css`
    position: relative;
    padding-bottom: 2em;
    padding-left: min(10vw, 60px);
    h3 {
      font-size: min(6vw, 32px);
    }
    h4 {
      font-size: min(5vw, 24px);
    }
    hr {
      opacity: 0.7;
      margin: 2em 0;
      border: 1px solid;
    }
  `,
  icon: css`
    display: inline-block;
    transform: rotate(45deg);
    position: absolute;
    top: 0.25em;
    left: -0.5em;
    width: 1em;
    height: 1em;
    background-color: ${Colors.Color1};
    transition: all 1s ease-in-out;
  `,
  period: css`
    display: inline-block;
    margin: 0;
    padding: 0.2em 1em;
    background-color: ${Colors.Color1};
    color: ${Colors.Color2};
    font-size: 0.75em;
    transition: all 1s ease-in-out;
  `,
  technologies: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 1em;

    li {
      width: 75px;
    }
  `,
}
