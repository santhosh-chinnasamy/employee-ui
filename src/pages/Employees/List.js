import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Input } from "antd";
import { employeeService } from "services";
import { useHistory, Link } from "react-router-dom";
import { initialPaginationValues } from "config";
import Base from "components/Layout";
const { confirm } = Modal;

export default function List() {
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    history.push({
      search: `?limit=${initialPaginationValues.pageSize}&page=${initialPaginationValues.page}`,
    });
    fetchResult();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchResult = () => {
    setLoading(true);

    employeeService
      .getAll()
      .then((data) => {
        setResult(data);
      })
      .catch((e) => {
        console.error(e);
        setResult({});
      });
    setLoading(false);
  };

  const onPaginationChange = (page, pageSize) => {
    history.push({
      search: `?limit=${pageSize}&page=${page}`,
    });
    fetchResult();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Deleted",
      dataIndex: "deleted",
      render: (text) => (text ? "yes" : "no"),
      filters: [
        {
          text: "Yes",
          value: true,
        },
        {
          text: "No",
          value: false,
        },
      ],
      onFilter: (value, record) => record.deleted === value,
    },
    {
      title: "Actions",
      fixed: "right",
      render: (text, row) => [
        <>
          <Button
            key="0"
            type="primary"
            onClick={() => {
              history.push({ pathname: `/edit/${row.id}` });
            }}
          >
            edit
          </Button>{" "}
          <Button danger key="1" onClick={() => showConfirm(row)}>
            delete
          </Button>
        </>,
      ],
    },
  ];

  const showConfirm = (row) => {
    confirm({
      confirmLoading: loading,
      title: `Do you want to delete this record ?`,
      mask: true,
      onOk() {
        setLoading(true);
        employeeService
          .delete(row.id)
          .then(() => fetchResult())
          .catch((e) => console.error(e));
        setLoading(false);
      },
    });
  };

  const onKeywordSearch = (keyword) => {
    if (keyword) {
      history.push({
        search: `?limit=${initialPaginationValues.pageSize}&page=${initialPaginationValues.page}&keyword=${keyword}`,
      });
    } else {
      history.push({
        search: `?limit=${initialPaginationValues.pageSize}&page=${initialPaginationValues.page}`,
      });
    }
    fetchResult();
  };

  return (
    <Base>
      <Table
        columns={columns}
        dataSource={result?.results}
        rowKey="id"
        loading={loading}
        pagination={{
          total: result?.totalResults || initialPaginationValues.total,
          pageSize: result?.limit || initialPaginationValues.pageSize,
          current: result?.page || initialPaginationValues.page,
          onChange: onPaginationChange,
        }}
        TableComponents={{
          header: <p>tet</p>,
        }}
        title={() => {
          return (
            <span style={{ float: "right", marginBottom: "12px" }}>
              <Input.Search
                placeholder="Enter name or email"
                onSearch={onKeywordSearch}
                style={{ width: 200 }}
              />
              &nbsp;
              <Button type="primary">
                <Link to="/add">Add</Link>
              </Button>
            </span>
          );
        }}
      />
    </Base>
  );
}
