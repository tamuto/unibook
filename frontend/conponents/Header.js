import styled from '@emotion/styled'

import {
  Typography
} from '@mui/material'

const HeadBox = styled(Typography)`
  color: ${props => props.theme.palette.primary.contrastText};
  border-bottom: ${props => `solid 2px ${props.theme.palette.primary.contrastText}`};
  font-size: ${props => props.variant === 'body' ? '1em' : '1.5em'};
  font-weight: ${props => props.variant === 'body' ? 'normal' : 'bold'};
  padding: 15px;
  margin: 10px 10px 0px;
`

export default HeadBox