import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import PostImage from './PostImage';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

import { 
  RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone 
} from '@ant-design/icons'
import { Avatar, Button, Card, Comment, List, Popover, } from 'antd';


const PostCard = ({ post}) => {

  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  // const { me } = useSelector((state) => state.user);
  // Optinal Chaining 연산자
  // const id = me?.id;
  // 위 2줄 1줄로 처리 가능
  const id = useSelector((state) => state.user.me?.id);

  const onToggleLike = useCallback(
    () => {
      setLiked((prev) => !prev);
    }, []
  )
  const onToggleComment = useCallback(
    () => {
      setCommentFormOpened((prev) => !prev);
    }, []
  )

  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImage images={post.Images} /> }
        // cover={post.Images[0]}
        actions={[
          <RetweetOutlined key="retweet"/>,
          liked 
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
            : <HeartOutlined key="heart" onClick={onToggleLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover key="more" content={(
            <Button.Group>
              {id && post.User.id === id
                ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                )
                : <Button>신고</Button>
              }
            </Button.Group>
          )}>
          <EllipsisOutlined/>
          </Popover>
        ]}
      >
        <Card.Meta 
          avatar = {<Avatar>{post.User.nickName[0]}</Avatar>}
          title = {post.User.nickName}
          description = {<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post}/>
          <List 
            header = {`${post.Comments.length}개의 댓글`}
            itemLayout = "horizontal"
            dataSource = {post.Comments}
            renderItem = { (item) => (
              <li>
                <Comment
                  author = {item.User.nickName}
                  avatar = {<Avatar>{item.User.nickName[0]}</Avatar>}
                  content = {item.Content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  )
};

PostCard.propTypes = {
  post : PropTypes.shape({
    id : PropTypes.number,
    User : PropTypes.object,
    content : PropTypes.string,
    createAt : PropTypes.object,
    Comments : PropTypes.arrayOf(PropTypes.object),
    Images : PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;