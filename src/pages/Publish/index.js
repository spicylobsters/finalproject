import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useStore } from '@/store'
import { useEffect, useRef, useState } from 'react'
import { http } from '@/utils'

const { Option } = Select

const Publish = () => {
  const { channelStore } = useStore()
  const [fileList, setFileList] = useState([])
  const [imgCount, setImgCount] = useState(1)
  const navigate = useNavigate()



  const imgHold = useRef()
  const onUploadChange = ({ fileList }) => {
    const formatList = fileList.map(item => {
      if (item.response) {
        return { url: item.response.data.url }
      } else {
        return item
      }
    })
    setFileList(formatList)
    imgHold.current = formatList
  }

  //change number of upload imgs
  const changeImg = (e) => {
    const count = e.target.value
    setImgCount(count)

    if (count === 1) {
      const singleImg = imgHold.current[0]
      setFileList(!singleImg ? [] : [singleImg])
    } else if (count === 3) {
      setFileList(imgHold.current)
    }
  }

  //upload article
  const onFinish = async (value) => {
    const { channel_id, content, title, type } = value
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map(item => item.url)
      }
    }
    if (articleId) {
      await http.put(`/mp/articles/${articleId}?draft=false`, params)
    } else {
      await http.post('/mp/articles?draft=false', params)
    }
    navigate('/article')
    message.success(`${articleId ? 'Edit success' : 'Submit success'}`)

  }

  //edit article
  const [params] = useSearchParams()
  const articleId = params.get('id')

  const form = useRef()
  useEffect(() => {
    async function getArticle () {
      const res = await http.get(`/mp/articles/${articleId}`)
      const data = res.data
      form.current.setFieldsValue({ ...data, type: data.cover.type })
      const formatImg = data.cover.images.map((item) => ({ url: item }))
      setFileList(formatImg)
      imgHold.current = formatImg
    }
    if (articleId) {
      getArticle()
    }
  }, [articleId])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{articleId ? 'edit ' : 'new '}article</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            type: 1,
            content: ''
          }}
          onFinish={onFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}

            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group
                onChange={changeImg}
              >
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {/* <Upload 
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
             </Upload> */}

            {imgCount > 0 && (<Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList
              action="http://geek.itheima.net/v1_0/upload"
              fileList={fileList}
              onChange={onUploadChange}
              multiple={imgCount > 1}
              maxCount={imgCount}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>)}


          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />

          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? 'edit ' : 'new '}article
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish