import React, { useLayoutEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import { useForm, ErrorMessage, Controller } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import axios from 'axios'

export const EditRecord: React.FC = () => {
  const { record_id } = useParams()
  const { register, errors, handleSubmit, setValue, control } = useForm()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ message, setMessage ] = useState('')

  useLayoutEffect(() => {
    const f = async () => {
      await getRecord()
    }
    f()
  }, [])

  const API_URL = `${process.env.REACT_APP_HEROKU_API}`
  //const API_URL = 'http://localhost:8080/api/'

  const getRecord = async () => {
    setIsLoading(true)
    const GET_RECORD_URL = `${API_URL}record/edit?id=${record_id}`
    await axios.get(GET_RECORD_URL).then(res => {
      setIsLoading(false)
      const record = res.data
      setValue([
        { title: record[0].title }, 
        { title_kana: record[0].title_kana }, 
        { evaluation: record[0].evaluation }, 
        { author: { value: record[0].author_id, label: record[0].name } },
      ])
    })
  }

  const onSubmit = async (data: any) => {
    let params = new URLSearchParams()
    params.append('id', record_id)
    params.append('title', data.title)
    params.append('title_kana', data.title_kana)
    params.append('evaluation', data.evaluation)
    params.append('author_id', data.author.value)
    const API_URL = `${process.env.REACT_APP_HEROKU_API}record/update`
    const response = await axios.post(API_URL, params).then((res) => {
      return res.data
    })
    if (response.Status === "OK") {
      setMessage("データ更新完了")
    } else {
      setMessage("データ更新に失敗しました")
    }
    console.log(response)
  }

  type authorOption = {
    value: string,
    label: string
  }

  const callApi = async (param: string) => {
    console.log('call callapifunc')
    console.log(typeof param)
    let authors: authorOption[] = []
    if (!param) return authors
    const GET_AUTHOR_URL = `${API_URL}author/search?name=${param}`
    await axios.get(GET_AUTHOR_URL).then(res => {
      const response = res.data
      console.log(response)
      Array.from(response).forEach((e: any) => {
        const author = {
          value: e.ID,
          label: e.Name
        }
        authors.push(author)
      });
    })
    return authors
  }

  return (
    <>
      <Link to='/'>HOME</Link>
      <h2>Edit Record</h2>
      <p>{message}</p>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="id" value={record_id} ref={register}/>
          Title：<input type="text" name="title" ref={register({ required: true })} />
          <ErrorMessage errors={errors} name="title" as="span" message="this is required"/><br/>
          TitleKana：<input type="text" name="title_kana" ref={register}/><br/>
          Eval：<input type="text" name="evaluation" ref={register({ required: true })}/>
          <ErrorMessage errors={errors} name="evaluation" as="span" message="this is required"/><br/>
          <Controller 
            as={<AsyncSelect loadOptions={callApi}/>}
            name="author"
            control={control}
          />
          <input type="submit" value="更新"/>
        </form>
      )}
    </>
  )
}

export default EditRecord
