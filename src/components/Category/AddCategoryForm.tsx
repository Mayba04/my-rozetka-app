import {Button, Divider, Form, Input, message, Upload, UploadFile, UploadProps} from "antd";
import {useState} from "react";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import { PlusOutlined} from '@ant-design/icons';
import {ICategoryCreate} from "../Category/type.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddCategoryForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const onSubmit = async (values: any) => {
      if(file==null) {
          message.error("Оберіть фото!");
          return;
      }
      const model : ICategoryCreate = {
          name: values.name,
          image: file
      };
      try {
          await axios.post("http://rozetka.com/api/categories", model,{
              headers: {
                  "Content-Type": "multipart/form-data"
              }
          });
          navigate("/");
      }
      catch (ex) {
          message.error('Error creating category!');
      }
  }
  const onSubmitFailed = (errorInfo: any) => {
      console.log("Error Form data", errorInfo);
  }

  type FieldType = {
      name?: string;
  };

  const beforeUpload = (file: RcFile) => {
      const isImage = /^image\/\w+/.test(file.type);
      if (!isImage) {
          message.error('Select an image file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
          message.error('The file size should not exceed 10MB!');
      }
      console.log("is select", isImage && isLt2M);
      return isImage && isLt2M;
  };
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      const file = info.file.originFileObj as File;
      setFile(file);
  };

  const uploadButton = (
      <div>
          <PlusOutlined/>
          <div style={{marginTop: 8}}>Upload</div>
      </div>
  );

  return (
  <>
    <Divider>Create category</Divider>
    <Form
    labelCol={{span: 8}}
    wrapperCol={{span: 16}}
    style={{maxWidth: 600}}
    initialValues={{remember: true}}
    onFinish={onSubmit}
    onFinishFailed={onSubmitFailed}>
    <Form.Item
    label="Name"
    name="name"
    rules={[{required: true, message: 'Enter name!'}]}
    >
      <Input/>
      </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="#"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            accept="image/*"
            >
          
          {file ? (
                      <img src={URL.createObjectURL(file)} alt="avatar" style={{ width: '100%', height: 'auto', maxWidth: '300px' }}/>
                  ) : (
                      uploadButton
                  )}
              </Upload>     
        </div>

        <Form.Item wrapperCol={{offset: 8, span: 16}}> 
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>  

      </Form> 
  </>
  )
}
export default AddCategoryForm;
