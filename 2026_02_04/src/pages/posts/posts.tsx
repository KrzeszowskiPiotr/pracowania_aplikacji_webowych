import { useEffect, useState} from "react";
import type {Post} from "../../types/post.ts";
import {Link} from "react-router";
import styles from "./posts.module.scss";


export default function Posts(){

    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<Array<Post>>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(respone => respone.json())
            .then(json => setPosts(json as Array<Post>))
            .catch(()=>{
                setIsError(true);
            })
            .finally(() => setIsLoading(false));
    })

    return(
        <div className={styles.posts}>
            {isLoading && (
                <>Trwa ladowanie...</>
            )}
            {isError && (
                <>Wystapil nieczokiwany blad</>
            )}
            {!isLoading && !isError && (
                <>
                    {posts.length > 0 && (
                        <>
                            {posts.map(Post => (
                                <div key={Post.id} className={styles.postsPost}>
                                    <h5 className={styles.postsTitle}>
                                        {Post.title}
                                    </h5>
                                    <p className={styles.postsBody}>
                                        {Post.body.substring(0, 50)};
                                    </p>
                                    <Link className={styles.postsLink}
                                        to={`posts/Post/${Post.id}`}
                                    >Przejdz do wpisu
                                    </Link>
                                </div>
                            ))}
                        </>
                    )}
                    {posts.length == 0 && (
                        <>Brak postow</>
                    )}
                </>
            )}
        </div>
    )

}