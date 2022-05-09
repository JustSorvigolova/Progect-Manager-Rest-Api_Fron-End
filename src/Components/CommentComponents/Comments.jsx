import React, {useState} from 'react';
import CreateComment from "./CreateComments";
import Grid from "@mui/material/Grid";
import comment from './comment.module.css'
import CommentCard from "./CommentCard";
import {Alert, AlertTitle} from "@mui/material";
import { FixedSizeList } from 'react-window';

export const Comments = (props) => {
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = props.comments.filter(
        (backendComment) => backendComment.project === props.project
    );

    const addComment = (text_title) => {
        props.CommentCreate(text_title)
        setActiveComment(null);
    }
    const deleteComment = (commentId) => {
        props.CommentDelete(commentId)
    }
    const renderRow = () => {
        return (
       rootComments.map((rootComment) => (
                        <CommentCard
                        update_comment_success={props.update_comment_success}
                        project={props.project}
                        key={rootComment.id}
                        comment={rootComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        deleteComment={deleteComment}
                        currentUserName={props.currentUserName}
                        />
                ))
        )
    }
    return (
        <div className={comment.comments}>
            <h2 className={comment.commentsTitle}>Comments</h2>
            <CreateComment project={props.project} user={props.currentUserName} addComment={addComment}/>
            <Grid container justifyContent={'center'} justifyItems={'center'}>
                <Grid padding={2}  item xs={8}>
                    {!rootComments.length ?
                        <Alert severity="info">
                            <AlertTitle><h4>You haven't comments</h4></AlertTitle>
                        </Alert>
                        :
                            <FixedSizeList
                                height={360}
                                width={500}
                                itemSize={1}
                                itemCount={1}
                                overscanCount={5}
                                >

                                {renderRow}

                            </FixedSizeList>
                    }
                </Grid>
            </Grid>
        </div>
    );
}

