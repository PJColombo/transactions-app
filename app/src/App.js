import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useAragonApi, useGuiStyle } from '@aragon/api-react'
import {
  Main,
<<<<<<< HEAD
  SyncIndicator,
=======
>>>>>>> c17ea1b9a598a149ccac9b8d8b4822efcc68d94b
  Header,
  Tabs,
  Button,
  IconError,
<<<<<<< HEAD
} from '@aragon/ui'
import AccountsField from './AccountsField'

=======
  DropDown,
  textStyle,
} from '@aragon/ui'
import AccountsField from './AccountsField'

import LocalAppBadge from './components/LocalIdentityBadge/LocalAppBadge'

>>>>>>> c17ea1b9a598a149ccac9b8d8b4822efcc68d94b
import { DEFAULT_STAKE, validateAccounts } from './lib/account-utils'
import {
  createTokenEVMScript,
  addDecimalsToAccountsAmounts,
  getTokenHandler,
} from './lib/token-utils'

import votingAbi from './abi/Voting.json'

const tabs = [
  { name: 'Mint', id: 'mint' },
  { name: 'Transfer', id: 'transfer' },
]

function App() {
  const { appearance } = useGuiStyle()

  const [selectedTab, setSelectedTab] = useState('mint')

  const currentTab = tabs.find(t => t.id === selectedTab) || {}

  const tabChangeHandler = useCallback(
    index => {
      const id = tabs[index].id
      setSelectedTab(id)
    },
    [tabs]
  )

  const ScreenTab = ({ tabId }) => {
    switch (tabId) {
      case 'mint':
        return <Mint />
      case 'transfer':
        return <Transfer />
      default:
        return null
    }
  }

  return (
    <Main theme={appearance}>
      <Header primary="Transactions" />
      <Tabs
        items={tabs.map(t => t.name)}
        selected={tabs.indexOf(currentTab)}
        onChange={tabChangeHandler}
      />
      <ScreenTab tabId={currentTab.id} />
    </Main>
  )
}

const Mint = () => {
  const { installedApps, api } = useAragonApi()

  const [accounts, setAccounts] = useState([['', DEFAULT_STAKE]])
  const [errors, setErrors] = useState([])

  const [tokenManagerIndex, setTokenManager] = useState(0)
  const [votingAppIndex, setVotingApp] = useState(0)

  const tokenManagerApps = installedApps.filter(
    ({ name }) => name.toLowerCase() === 'tokens'
  )
  const votingApps = installedApps.filter(
    ({ name }) => name.toLowerCase() === 'voting'
  )

  const tokenManager = tokenManagerApps[tokenManagerIndex]
  const votingApp = votingApps[votingAppIndex]

  const mintTokens = async accounts => {
    const tokenHandler = await getTokenHandler(api, tokenManager.appAddress)
    const decimals = await tokenHandler.decimals().toPromise()
    const formattedAccounts = addDecimalsToAccountsAmounts(accounts, decimals)

    const votingHandler = api.external(votingApp.appAddress, votingAbi)
    const evmScript = await createTokenEVMScript(
      formattedAccounts,
      tokenManager.appAddress
    )

    votingHandler.newVote(evmScript, 'Mint Tokens').subscribe(() => {
      setAccounts([['', DEFAULT_STAKE]])
    })
  }

<<<<<<< HEAD
  const handleSubmit = () => {
    const accountsErrors = []
    const errorMsg = validateAccounts(accounts)
=======
  const searchIdentity = async value => {
    if (/^(0x)?[0-9a-f]{40}$/i.test(value)) {
      return value
    }
    const exists = await api.searchIdentities(value).toPromise()
    if (exists && exists.length === 1) {
      const item = exists[0]
      if (
        item.name.toLowerCase() === value.toLowerCase() ||
        item.address.toLowerCase() === value.toLowerCase()
      ) {
        return item.address
      }
    }
    return value
  }

  const handleSubmit = async () => {
    const accountsErrors = []
    const identities = await Promise.all(
      accounts.map(([identity]) => searchIdentity(identity))
    )
    const _accounts = accounts.map(([, amount], i) => [identities[i], amount])
    const errorMsg = validateAccounts(_accounts)
>>>>>>> c17ea1b9a598a149ccac9b8d8b4822efcc68d94b
    if (errorMsg) accountsErrors.push(errorMsg)

    if (accountsErrors.length) setErrors([...accountsErrors])
    else {
      setErrors([])
<<<<<<< HEAD
      mintTokens()
=======
      mintTokens(_accounts)
>>>>>>> c17ea1b9a598a149ccac9b8d8b4822efcc68d94b
    }
  }

  return (
    <>
      <InnerLabel>Apps</InnerLabel>
      <DropDowns>
        <DropDown
          items={formattedApps(tokenManagerApps)}
          selected={tokenManagerIndex}
          onChange={setTokenManager}
        />
        <DropDown
          items={formattedApps(votingApps)}
          selected={votingAppIndex}
          onChange={setVotingApp}
        />
      </DropDowns>
      <AccountsField accounts={accounts} onChange={setAccounts} />
      <Button
        mode="strong"
        onClick={handleSubmit}
        wide
        disabled={
<<<<<<< HEAD
          accounts.filter(([address, amount]) => address && amount !== null)
            .length === 0
=======
          !accounts.filter(([address, amount]) => address && amount !== null)
            .length > 0
>>>>>>> c17ea1b9a598a149ccac9b8d8b4822efcc68d94b
        }
      >
        Send
      </Button>
      {errors && (
        <div
          css={`
            margin-top: 2%;
          `}
        >
          {errors.map((err, index) => (
            <ErrorMessage key={index}>
              <IconError /> {err}
            </ErrorMessage>
          ))}
        </div>
      )}
    </>
  )
}
const Transfer = () => {
  return `Transfers not enabled yet.`
}

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  color: red;
`

<<<<<<< HEAD
=======
const StyledAppBadge = styled.div`
  display: inline-flex;
  margin-top: 5px;
`

const DropDowns = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
`

const formattedApps = apps =>
  apps.map((app, index) => {
    return (
      <StyledAppBadge>
        <LocalAppBadge installedApp={app} />
      </StyledAppBadge>
    )
  })

const InnerLabel = styled.div`
  text-transform: capitalize;
  ${textStyle('label3')}
`

>>>>>>> c17ea1b9a598a149ccac9b8d8b4822efcc68d94b
export default App
