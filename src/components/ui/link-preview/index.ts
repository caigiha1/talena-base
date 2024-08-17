import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const isValidUrlProp = (props: any, propName: any, componentName: any) => {
  if (!props) {
    return new Error(`Required parameter URL was not passed.`)
  }
  if (!isValidUrl(props[propName])) {
    return new Error(
      `Invalid prop '${propName}' passed to '${componentName}'. Expected a valid url.`
    )
  }
}

const isValidUrl = (url: string) => {
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
  const validUrl = regex.test(url)
  return validUrl
}

function LinkPreview(props: any) {
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState({})
  const [isUrlValid, setIsUrlValid] = useState(false)

  const {
    url,
    render,
    customDomain
  } = props


  useEffect(() => {
    async function fetchData() {
      const fetch = window.fetch
      if (isValidUrl(url)) {
        setIsUrlValid(true)
      } else {
        return {}
      }
      setLoading(true)
      const response = await fetch(customDomain, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      })
      const data = await response.json()
      setPreview(data)
      setLoading(false)
    }
    fetchData()
  }, [url, customDomain])

  if (!isUrlValid) {
    console.error(
      'LinkPreview Error: You need to provide url in props to render the component'
    )
    return null
  }

  // If the user wants to use its own element structure with the fetched data
  return render({
    loading: loading,
    preview: preview
  })
}

LinkPreview.defaultProps = {
  customDomain: 'https://lpdg-server.azurewebsites.net/parse/link'
}

LinkPreview.propType = {
  url: isValidUrlProp,
  render: PropTypes.func,
  customDomain: PropTypes.string
}

export default LinkPreview