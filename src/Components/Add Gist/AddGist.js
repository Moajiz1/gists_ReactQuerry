import React from "react";
import { Form, Input, Button } from "antd";
import "./addgist.css";
import TextArea from "antd/lib/input/TextArea";
import { Select } from "antd";
import { onFinishFailed, successCheckAdd } from "../util/Utfn";
import { useAddGist } from "../../hooks/use-gists";
import { useBack } from "../../hooks/useBack";

const AddGist = () => {
  const { Option } = Select;

  const { mutate: addGist } = useAddGist();

  const submitGist = (value) => {
    console.log(value);
    if (value.content !== undefined) {
      addGist(value);
    } else {
      successCheckAdd();
    }
  };

  const { backBtn } = useBack();

  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={submitGist}
      onFinishFailed={onFinishFailed}
    >
      <div className="form-div">
        <h1 className="add-heading">Add Gist</h1>
        <Form.Item
          className="width"
          label=""
          required
          tooltip="This is a required field"
          name="description"
        >
          {/* <h3 className="text-identifier">Description</h3> */}

          <Input
            className="gist-desc-form"
            placeholder="Enter Gist description..."
            // value={description}
          />
        </Form.Item>

        <Form.Item
          label=""
          required
          tooltip="This is a required field"
          name="filename"
        >
          <Input
            className="gist-file-form"
            placeholder="Enter File Name..."
            // value={filename}
          />
        </Form.Item>

        <Form.Item
          className="width"
          label=""
          required
          tooltip="This is a required field"
          name="content"
        >
          <TextArea
            rows="7"
            className="gist-content-form"
            placeholder="Enter File Content"
          />
        </Form.Item>

        <Form.Item name="public">
          <Select
            // defaultValue="Public"
            style={{ width: 120, marginLeft: 320 }}
            name="public"
          >
            <Option value="true">Public</Option>
            <Option value="false">Private</Option>
          </Select>
        </Form.Item>
      </div>
      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <Button
          className="btn-create basic-btn"
          type="primary"
          htmlType="submit"
          // onClick={submitGist}
          // disabled={!gistForm.content}
        >
          Create Gist
        </Button>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <Button className="btn-back basic-btn" type="primary" onClick={backBtn}>
          <i className="fa fa-arrow-left"></i>Back
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddGist;
