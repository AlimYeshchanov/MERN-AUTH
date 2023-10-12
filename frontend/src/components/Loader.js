import React from 'react'
import ClipLoader from "react-spinners/CircleLoader"

const override= {
display: "block",
margin: "auto",
borderColor: "primary",
};

const Loader = () => {
  return (
    <ClipLoader
    cssOverride={override}
    aria-label='Loading Spinner'
    data-testid='loader'
    />
  )
}

export default Loader