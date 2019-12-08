import React, { useState, useEffect } from "react";
import { Modal, Spin, List } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import styles from "./style.css";

const ReactModal = props => {
  const viewSize = 10;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const scrollParentRef = React.useRef(null);
  // page_number + 1) * page_size

  const fetchDataFromServer = async ({ page, size }) => {
    console.log(page, size, "Paginate");
    setLoading(true);
    const response = await (
      await fetch(
        `http://jsonplaceholder.typicode.com/posts?_start=${(page + 1) *
          viewSize -
          viewSize}&_limit=${size}`
      )
    ).json();
    setData(data => {
      const copiedData = [...data].concat(response);
      console.log(copiedData, "CopiedData");
      return copiedData;
    });
    setHasMore(true);
    setCurrentPage(page);
    // console.log(response);
    // console.log((viewSize + 1) * page);
    setLoading(false);
  };

  useEffect(() => {
    if (props.visible) {
      fetchDataFromServer({ page: currentPage, size: viewSize });
    }
    // eslint-disable-next-line
  }, [props.visible]);

  return (
    <Modal
      title="Basic Modal"
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={() => {
        setLoading(false);
        setData([]);
        setCurrentPage(0);
        props.handleCancel();
      }}
    >
      <div className="demo-infinite-container" ref={scrollParentRef}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={() =>
            fetchDataFromServer({
              size: viewSize,
              page: currentPage + 1
            })
          }
          hasMore={!loading && hasMore}
          useWindow={false}
          getScrollParent={() => scrollParentRef.current}
        >
          <List
            dataSource={data}
            renderItem={item => (
              <List.Item key={item.id} className="background">
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.body}
                />
              </List.Item>
            )}
          >
            {loading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    </Modal>
  );
};

export default ReactModal;
