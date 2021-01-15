import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import UserDao from '@daos/User/UserDao.mock';
import { paramMissingError, IRequest } from '@shared/constants';
import docClient from "../dynamoClient";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client"

const router = Router();
const userDao = new UserDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;



/******************************************************************************
 *                      Get All Repos - "GET /api/repos/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const ProjectionExpression = `#id, #node_id, #name, #full_name, #private,
    #html_url, #description, #fork, #url, #forks_url, #keys_url, #collaborators_url,
     #teams_url, #hooks_url, #issue_events_url, #events_url, #assignees_url,
      #branches_url, #tags_url, #blobs_url, #git_tags_url, #git_refs_url,
      #trees_url, #statuses_url, #languages_url, #stargazers_url, #contributors_url,
      #subscribers_url, #subscription_url, #commits_url, #git_commits_url, #comments_url,
      #issue_comment_url, #contents_url, #compare_url, #merges_url, #archive_url,
      #downloads_url, #issues_url, #pulls_url, #milestones_url, #notifications_url,
      #labels_url, #releases_url, #deployments_url, #created_at, #updated_at, #pushed_at,
      #git_url, #ssh_url, #clone_url, #svn_url, #homepage, #size, #stargazers_count,
      #watchers_count, #language, #has_issues, #has_projects, #has_downloads, #has_wiki,
      #has_pages, #forks_count, #mirror_url, #archived, #disabled, #open_issues_count`

    const ExpressionAttributeNames = {
        "#id": "id","#node_id": "node_id", "#name": "name", "#full_name": "full_name", 
        "#private": "private", "#html_url": "html_url", "#description":"description", 
        "#fork": "fork", "#url": "url", "#forks_url": "forks_url", "#keys_url": "keys_url", 
        "#collaborators_url": "collaborators_url", "#teams_url": "teams_url", 
        "#hooks_url": "hooks_url", "#issue_events_url": "issue_events_url", 
        "#events_url": "events_url", "#assignees_url": "assignees_url", 
        "#branches_url": "branches_url", "#tags_url": "tags_url", "#blobs_url": "blobs_url", 
        "#git_tags_url": "git_tags_url", "#git_refs_url": "git_refs_url", "#trees_url": "trees_url", 
        "#statuses_url": "statuses_url", "#languages_url": "languages_url", 
        "#stargazers_url": "stargazers_url", "#contributors_url": "contributors_url",
        "#subscribers_url": "subscribers_url", "#subscription_url": "subscription_url", 
        "#commits_url": "commits_url", "#git_commits_url": "git_commits_url", 
        "#comments_url": "comments_url", "#issue_comment_url": "issue_comment_url", 
        "#contents_url": "contents_url", "#compare_url": "compare_url", 
        "#merges_url": "merges_url", "#archive_url": "archive_url", 
        "#downloads_url": "downloads_url", "#issues_url": "issues_url", 
        "#pulls_url": "pulls_url", "#milestones_url": "milestones_url", 
        "#notifications_url": "notifications_url", "#labels_url": "labels_url", 
        "#releases_url": "releases_url", "#deployments_url": "deployments_url", 
        "#created_at": "created_at", "#updated_at": "updated_at", 
        "#pushed_at": "pushed_at","#git_url": "git_url", "#ssh_url": "ssh_url", 
        "#clone_url": "clone_url", "#svn_url": "svn_url", "#homepage": "homepage", 
        "#size": "size", "#stargazers_count": "stargazers_count",
        "#watchers_count": "watchers_count", "#language": "language", 
        "#has_issues": "has_issues", "#has_projects": "has_projects", 
        "#has_downloads": "has_downloads", "#has_wiki": "has_wiki",          
        "#has_pages": "has_pages", "#forks_count": "forks_count", 
        "#mirror_url": "mirror_url", "#archived": "archived", 
        "#disabled": "disabled", "#open_issues_count": "open_issues_count"
    }
    const params: DocumentClient.ScanInput = {
        TableName: "Repos",
        ProjectionExpression,
        ExpressionAttributeNames
    };
    
    const onScan = (err: any, data: any) => {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.send(data)
            // print all Repos
            console.log("Scan succeeded.");
            data.Items.forEach(function(repo: any) {
               console.log(repo.id)
            });
    if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
        }
      }
      docClient.scan(params, onScan);

});



/******************************************************************************
 *                       Add One - "Repo /api/repos/add"
 ******************************************************************************/


// router.post('/add', async (req: IRequest, res: Response) => {
// TODO
// });



/******************************************************************************
 *                       Update - "REPO /api/repo/update"
 ******************************************************************************/

router.put('/update', async (req: IRequest, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await userDao.update(user);
    return res.status(OK).end();
});



/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete('/delete/:id', async (req: IRequest, res: Response) => {
    const { id } = req.params;
    await userDao.delete(Number(id));
    return res.status(OK).end();
});



/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
