import { MemberEntity } from "../models/member";
import Axios, { AxiosResponse } from "axios";

const gitHubURL = "https://api.github.com";
const gitHubMemberUrl = `${gitHubURL}/orgs/lemoncode/members`;

export const getMembersCollection = (): Promise<MemberEntity[]> => {
  const promise = new Promise<MemberEntity[]>((resolve, reject) => {
    try {
      Axios.get<MemberEntity[]>(gitHubMemberUrl).then((response) =>
        resolve(mapMemberLisstApiToModel(response))
      );
    } catch (ex) {
      reject(ex);
    }
  });

  return promise;
};

const mapMemberLisstApiToModel = ({
  data,
}: AxiosResponse<any[]>): MemberEntity[] =>
  data.map((gitHubMember) => ({
    id: gitHubMember.id,
    login: gitHubMember.login,
    avatar_url: gitHubMember.avatar_url,
  }));
