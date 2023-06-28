import { Link } from 'react-router-dom'
import { css } from '@emotion/react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Box from '@mui/material/Box'

import work01Image from '../../assets/work01_image.jpg'
import work02Image from '../../assets/work02_image.jpg'
import work03Image from '../../assets/work03_image.jpg'
import { Wave } from './Wave'

/*================================================
 Variables
================================================*/
const workData = [
  {
    title: '議事録作成アプリ',
    link: 'work01',
    imagePath: work01Image,
    description:
      '会議やミーティングでの効率的な議事録作成を支援するためのアプリケーション。音声認識によって会話をテキスト入力し、APIを利用して議事録として要約する。' +
      'ライブラリやAPIを活用したアプリケーションを開発することで、Reactの更なるスキル向上を目指した。',
    point:
      'ライブラリやAPIを効率的に活用できるよう、ドキュメントやサンプルコードをしっかり理解することや、' +
      'これらのサービスをアプリケーションに統合するための、適切なコードアーキテクチャを選択することを重視した。',
  },
  {
    title: 'スクロールアニメーションページ',
    link: 'work02',
    imagePath: work02Image,
    description:
      'スクロールアニメーションを用いて、1日のタイムスケジュールを表現したWebページ。' +
      '通常のWebページとは異なる手法を経験し、今後制作する際の表現力を向上させることを目的として作成。',
    point:
      'アニメーションの動きやタイミングに関して、要素の出現や移動の速度など細かく調整。' +
      '自然な流れでコンテンツを閲覧できるように、滑らかなアニメーションを実現することを意識した。',
  },
  {
    title: 'ToDo管理アプリ',
    link: 'work03',
    imagePath: work03Image,
    description:
      'ToDoリストを管理するためのアプリケーションで、Todo(タスク)の登録から編集、削除などの基本操作を実装。' +
      'ReactとTypeScriptの基礎知識を習得することを目的として本アプリを作成。',
    point:
      'React,TypeScriptともに初めての開発だったため、TypeScriptの型システムを理解し、Reactコンポーネントとの統合に慣れるまで時間を要した。' +
      'しかし、これらの言語での開発は、コードの可読性と保守性が向上し、バグの早期発見にも役立つことが理解できた。',
  },
]

/*================================================
 Component
================================================*/
export const Works = () => {
  return (
    <section id="works" css={styles.section}>
      <Wave />
      <div className="wrapper">
        <h2>Works</h2>
        <Box css={styles.box}>
          {workData.map((work, index) => (
            <Link key={index} to={work.link}>
              <Card css={styles.card}>
                <CardActionArea css={[styles.cardArea, index % 2 !== 0 && styles.flexReverse]}>
                  <CardMedia component="img" image={work.imagePath} alt={work.title} css={styles.cardMedia} />
                  <CardContent css={styles.cardContent}>
                    <Typography gutterBottom component="h3" variant="h6">
                      {work.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {work.description}
                    </Typography>
                    <Typography gutterBottom component="h4" variant="h6" sx={{ mt: 2 }}>
                      ☆POINT
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {work.point}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </Box>
      </div>
    </section>
  )
}

/*================================================
 Styling
================================================*/
const styles = {
  section: css`
    // background-color: rgba(47, 181, 235, 0.5);
  `,
  box: css`
    max-width: 1024px;
    margin: 4em auto;
  `,
  card: css`
    margin: 0 auto 4em;
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0.9);
    transition: box-shadow 0.3s, transform 0.3s;
    @media (max-width: 900px) {
      max-width: 600px;
    }
    &:hover {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      transform: scale(1.02);
    }
  `,
  cardArea: css`
    display: flex;
    padding: 1em;
    @media (max-width: 900px) {
      flex-direction: column;
    }
  `,
  flexReverse: css`
    flex-direction: row-reverse;
  `,
  cardMedia: css`
    width: 50%;
    padding: 1em;
    border-radius: inherit;
    @media (max-width: 900px) {
      width: 100%;
    }
  `,
  cardContent: css`
    width: 100%;
    min-height: 250px;
  `,
}
