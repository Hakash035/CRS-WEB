import React, { useEffect, useState } from 'react'
import { BiTime,BiComment,BiSearch } from 'react-icons/bi'
import { BsLink45Deg } from 'react-icons/bs'
import axios from 'axios'
import { db } from './firebase' 
import { useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { LineWave } from 'react-loader-spinner'
import { data } from './general-info'
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc } from 'firebase/firestore/lite'

function HistoryComponent({ text }) {
  return (
    <div className='his-comp'>
      <BiComment size={20}/>
      <h5>{text}</h5>
    </div>
  )
}

function ResultComponent({ name, service_provider, link }) {
  return (
    <div className="result-comp">
      <div className="content">
        <h4>{name}</h4>
        <p>{service_provider}</p>
      </div>
      <BsLink45Deg size={32} onClick={()=>{window.open(link, 'blank')}} style={{cursor:"pointer"}}/>
    </div>
  )
}

function App() {
  const [input, setInput] = useState("")
  const [rec, setRec] = useState(data)
  const [his, setHis] = useState([])
  const [loading, setLoading] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async(e) => {
    e.preventDefault()

    try{
      await logout()
      navigate('/login')
    }catch(error){
      console.log('Failed to Logout')
    }
  }

  const getHistory = async() => {
    let collref = collection(db, '/history')
    let docsSnap = await getDocs(query(collref, orderBy("timestamp","desc")))
    docsSnap.forEach((doc)=>{
      setHis(prev => [...prev, doc.data()])
    })
  }

  const clearHistory = async() => {
    let collref = collection(db, '/history')
    let docsSnap = await getDocs(collref)
    docsSnap.forEach(async(doc)=>{
      await deleteDoc(doc.ref)
    })
  }

  useEffect(()=>{
    setHis([])
    getHistory()
  },[rec])

  const getRecommendation = async() => {
    setLoading(true)
    await axios.get(`https://crs-wsbw.onrender.com/${input}`).then((res)=>{
      setRec([...res.data])
    }).finally(async()=>{
      let collref = collection(db, '/history')
      await addDoc(collref, {
        service: input,
        timestamp: serverTimestamp()
      })
      setInput("")
      setLoading(false)
    })
  } 

  return (
    <div className='cont'>
      <div className="history">
        <div className="head">
          <BiTime size={30}/>
          <h2>History</h2>
        </div>
        <div className="history-comp">
            {his.map((history, index)=>{
              return <HistoryComponent key={index} text={history.service}/>
            })}
        </div>
        <div className='btns'>
          <button onClick={clearHistory}>Clear History</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>
      <div className="main-cont">
        <div className="container">
          <h2>Cloud Recommendation System</h2>
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p> */}
          <div className="search">
            <input type="text" placeholder='search a service' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
            <BiSearch size={32} onClick={getRecommendation} style={{cursor:"pointer"}}/>
          </div>
          <div className="results">
              {loading? <LineWave color="white" visible={loading} /> : rec.map((recommendation, index)=>{
                return <ResultComponent key={index} name={recommendation.SERVICE} service_provider={recommendation.SERVICE_PROVIDER} link={recommendation.SERVICE_LINK}/>
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App