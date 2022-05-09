import React from 'react';
import {Avatar, Card, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {deepPurple} from '@mui/material/colors';
import Grid from "@mui/material/Grid";
import UpdateComment from "./UpdateComment";
import comm from './comment.module.css'
import Button from "@mui/material/Button";


const CommentCard = ({comment, setActiveComment, activeComment, project,update_comment_success,
                     updateComment, deleteComment,
                     currentUserName
                 }) => {
    let avatarName= comment.user.slice(0,2)
     const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const canDelete = currentUserName === comment.user;
  const canEdit = currentUserName === comment.user;
    return (
        <Grid padding={2}>
        <Card >
        <List  sx={{ width: '100%', maxWidth: 350 }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
       <Avatar sx={{ bgcolor: deepPurple[400] }}>{avatarName}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<span id={comm.color_comment_username}>{comment.user}</span>}
          secondary={

              <Typography
                sx={{ display: 'flex' }}
                component="span"
                variant="body3"
                color="text.secondary"
              >
             {!isEditing &&   <span id={comm.color_comment}>{comment.text_title}</span>}
            {isEditing && (
          <UpdateComment
            update_comment_success={update_comment_success}
            setActiveComment={setActiveComment}
            hasCancelButton
            project={project}
            updateComment={updateComment}
            id_comment={comment.id}
            currentUserName={currentUserName}
          />
        )}
              </Typography>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li" />
            <Grid spacing={2} container justifyContent={'center'}>
                {canDelete && (
                    <Grid id={comm.color_comment} className={comm.DeletePointer} onClick={()=>deleteComment(comment.id)} item>
                    <Button color={'error'}>Delete</Button>
                    </Grid>
                )}

                {canEdit && (
                <Grid id={comm.color_comment} className={comm.EditPointer} onClick={()=> setActiveComment({id: comment.id, type: "editing"})} item>
                  <Button color={'secondary'}>Edit</Button>
                </Grid>
                )}
            </Grid>
        </List>
            </Card>
            </Grid>
    );
};

export default CommentCard;