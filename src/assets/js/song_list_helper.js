import fsCfg from './fw'
import './framework'

const song_list_helper = {
    getSongList(user, listId, listName) {
        var url = "/api/Music/GetSongList?user={0}&listId={1}&listName={2}";
        url = framework.strFormat(url, user, listId, listName);
        return new Promise((reject, resolve) => {
            fsCfg.get(url).then((res)=>{
                if (res.success) {
                    reject(res.data);
                }
                else {
                    resolve(res.message.content);
                }
            }).catch((err) => {
                resolve(err);
            })
        })
    },

    createSongList(user, name, img) {
        var url = "/api/Music/CreateSongList?user={0}&name={1}&img={2}";
        url = framework.strFormat(url, user, name, img);
        return new Promise((reject, resolve) => {
            fsCfg.get(url).then((res) => {
                if (!res.success) {
                    resolve(res.message.content);
                }
                else {
                    reject("success");
                }
            }).catch((err) => {
                resolve(err);
            })
        });
    },

    delSongList(id) {
        let url = "/api/Music/DeleteSongList?listId={0}";
        url = framework.strFormat(url, id);
        return new Promise((reject, resolve) => {
            fsCfg.get(url).then((res) => {
                if (res.success) {
                    reject('success');
                }
                else {
                    resolve(res.message.content);
                }
            }).catch((err) => {
                resolve(err);
            });
        });
    },

    addSongToList(user, listId, songId) {
        let url = "/api/Music/AddSongToList?user={0}&listId={1}&songId={2}";
        url = framework.strFormat(url, user, listId, songId);
        return new Promise((reject, resolve) => {
            fsCfg.get(url).then((res) => {
                if (res.success) {
                    reject(res.data);
                }
                else {
                    resolve(res.message.content);
                }
            }).catch((err) => {
                resolve(err);
            });
        });
    },
}


export default song_list_helper;