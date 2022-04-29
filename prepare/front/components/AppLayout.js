import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Input, Menu, Row, Col } from 'antd';


const AppLayout = ({children}) => {
    return (
        <div>
            <Menu mode='horizontal'>
                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{verticalAlign : "middle"}}/>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            {/* gutter : 여백 처리 컬럼 간의 사이의 합이 8px 만큼 padding 적용 */}
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    왼쪽 메뉴
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/ieunune/react_nodebird" target="_blank" rel="noreferrer noopener">GIT</a>
                </Col>
            </Row>
            
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;