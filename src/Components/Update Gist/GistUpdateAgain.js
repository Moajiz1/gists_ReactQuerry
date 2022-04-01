import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import { useParams } from "react-router-dom";
import { useEditRecord, useUpdateGist } from "../../hooks/use-gists";
import { useBack } from "../../hooks/useBack";
import { onFinishFailed, successCheck } from "../util/Utfn";

const GistUpdateAgain = () => {
  const { gistID } = useParams();
  const { data, gistContent, filename } = useEditRecord(gistID);

  const { mutate: editGist } = useUpdateGist();

  const fnCalls = (value) => {
    const obj = { gistID, value };
    if (value.content !== undefined) {
      editGist(obj);
    } else {
      successCheck();
    }
  };

  const { backBtn } = useBack();

  return (
    <div>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={fnCalls}
        onFinishFailed={onFinishFailed}
        fields={[
          {
            name: ["description"],
            value: data?.description,
          },
          {
            name: ["filename"],
            value: filename,
          },
          {
            name: ["content"],
            value: gistContent,
          },
        ]}
      >
        <div className="form-div">
          <h1 className="add-heading">Edit Gist</h1>
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
              readOnly={true}
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

          {/* <Form.Item name="public">
            <Select
              // defaultValue="Public"
              style={{ width: 120, marginLeft: 320 }}
              name="public"
            >
              <Option value="true">Public</Option>
              <Option value="false">Private</Option>
            </Select>
          </Form.Item> */}
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
            Update Gist
          </Button>
        </Form.Item>
        <Button className="btn-back basic-btn" type="primary" onClick={backBtn}>
          <i className="fa fa-arrow-left"></i>Back
        </Button>
      </Form>
    </div>
  );
};

export default GistUpdateAgain;
