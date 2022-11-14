import { Button, Container, Stack, TextField, Typography } from '@mui/joy'
import { useEffect, useState } from 'react'

const LOCAL_KEY = 'lowercase-copy'

type CopyData = string[]

export const Copy = () => {
  const [copyData, setCopyData] = useState<CopyData>([''])
  const [lastCopied, setLastCopied] = useState<string>('')

  useEffect(() => {
    const _storedData = localStorage.getItem(LOCAL_KEY)
    const storedData = JSON.parse(_storedData ?? '[""]') as CopyData

    setCopyData(storedData)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(copyData))
  }, [copyData])

  const setData = (index: number, text: string) => {
    const newCopyData = JSON.parse(JSON.stringify(copyData)) as CopyData
    newCopyData[index] = text
    setCopyData(newCopyData)
  }

  const addField = () => {
    const newCopyData = JSON.parse(JSON.stringify(copyData)) as CopyData
    newCopyData.push('')
    setCopyData(newCopyData)
  }

  const clearDataAtIndex = (index: number) => {
    const newCopyData = JSON.parse(JSON.stringify(copyData)) as CopyData
    newCopyData.splice(index, 1)
    setCopyData(newCopyData)
  }

  const copyDataAtIndex = (index: number) => {
    setLastCopied(copyData[index] ?? '')
    navigator?.clipboard.writeText(copyData[index] ?? '')
  }

  const clearAllData = () => {
    setCopyData([''])
  }

  return (
    <Container>
      <Stack sx={{ my: 4, gap: 4 }}>
        <Typography>Made with ❤️ by IkkyuSan</Typography>
        <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
          <Button
            onClick={addField}
            variant="outlined"
            color="info"
            sx={{ background: '#004400' }}
          >
            Add Field
          </Button>
          <Button
            onClick={clearAllData}
            variant="outlined"
            color="danger"
            sx={{ background: '#440000' }}
          >
            Clear All
          </Button>
          <Typography>
            {lastCopied ? `"${lastCopied}" -> copied` : ''}
          </Typography>
        </Stack>
        <Stack sx={{ gap: 2 }}>
          {copyData.map((text, idx) => (
            <Stack direction="row" sx={{ gap: 2 }} key={idx}>
              <TextField
                value={text}
                onChange={(e) => setData(idx, e.target.value)}
                sx={{ width: '100%' }}
              />
              <Button
                onClick={() => copyDataAtIndex(idx)}
                sx={{ width: 200, background: '#000066' }}
              >
                Copy
              </Button>
              <Button
                onClick={() => clearDataAtIndex(idx)}
                sx={{ width: 100, background: '#220000' }}
              >
                Clear
              </Button>
            </Stack>
          ))}
          <Button
            onClick={addField}
            variant="outlined"
            color="info"
            sx={{ background: '#004400' }}
          >
            Add Field
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
