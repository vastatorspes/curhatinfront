import Layout from '../components/Layout'
import Link from 'next/link'

const Index = () => {
    return(
        <Layout>
            <div className="jumbotron">
                <p className="text-center" style={{fontSize:"41px"}}>You Are Not Alone</p>
                <p className="text-center" style={{fontSize:"26px"}}>Every Problem Has Solution</p>
                <p className="display-4 text-center font-weight-bold">SHARE HERE</p>
            </div>
            <div class="w3-row-padding w3-padding-64 w3-container">
                <div class="w3-content">
                    <div className="w3-twothird pr-5">
                        <h1 className="text-center">What is Curhat?</h1>
                        <p class="w3-padding-32 text-center">
                            <b>Curhat</b> which stands for <i>"curahan hati"</i> is a word in Indonesian language, 
                            which means a time when one person tries to tell something to people who are considered close, 
                            and usually that is told is a personal problem.
                        </p>

                        <p class="w3-text-grey">
                            We believe everyone has their personal problems. 
                            If the problem is not resolved properly, it will cause stress and even depression which in some people may end up in suicide. 
                            Just by telling your problem to others can ease the burden, especially if you share the problem with the right people, 
                            sometimes they can provide very good input. 
                            However, sharing a problem with the wrong person can make things worse.
                            If you don't have anyone to share with, or you cant tell your problem to anoyone by any reasons, you might want to try to share with us.
                            We don't need to know who you are in real, but we care about your problems.
                            This is our mission to lighten other people's burden. 
                            We might went through the same situation as you are.
                            We are willing to let you know how we overcome the situation or just simply to listen to your problems. 
                        </p>
                    </div>

                    <div class="w3-third w3-center">
                        <i class="fa fa-anchor w3-padding-64 w3-text-light-blue" style={{fontSize:"260px"}}></i>
                        <p>
                            <i>
                                "There are no new problems in this world, the problem that you are facing right now must have been faced by someone else."
                            </i> 
                        </p>
                    </div>
                </div>
            </div>
            <hr/>
            <div class="w3-row-padding w3-padding-64 w3-container">
                <div class="w3-content">
                    <div class="w3-third w3-center">
                    <i class="fa fa-coffee w3-padding-64 w3-text-teal w3-margin-right" style={{fontSize:"260px"}}></i>
                    </div>

                    <div class="w3-twothird">
                    <h1>Share With Us</h1>
                    <p class="w3-padding-16">
                        Share your problems or stories with us as anonymous if you dont want to reveal your identity.
                        We are willing to listen and hopefully we can give you advice based on our experiences.
                        Don't face your problems all alone.    
                    </p>

                    <form>
                        <div class="form-group">
                            <textarea rows="10" className="form-control" placeholder="Start Curhat ... This is completely anonymous, you dont even need to login." style={{resize:"none"}} />
                        </div>
                        <button type="submit" className="form-control btn btn-info">Curhat</button>
                    </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Index