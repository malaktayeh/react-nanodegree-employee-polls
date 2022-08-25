/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import PollHeader from './PollHeader';
import NavBar from '../Navbar';
import { vote, selectIds, selectAllQuestions } from '../../features/questionsSlice';
import { selectAllUsers } from '../../features/usersSlice';
import { authedUserSelector } from '../../features/authedUserSlice';
import UnansweredPoll from './UnansweredPoll';
import AnsweredPoll from './AnsweredPoll';
import PollStatistics from './PollStatistics';

function Poll() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pollData, setPollData] = useState({});

  const { pathname } = useLocation();
  const lastIndexOfSlash = pathname !== null ? pathname.lastIndexOf('/') : null;
  const getPollIdFromURL = pathname.substring(lastIndexOfSlash + 1);

  const status = useSelector((state) => state.questions.status);
  const allQuestionIds = useSelector(selectIds);
  const users = useSelector(selectAllUsers);
  const questions = useSelector(selectAllQuestions);
  const [question, setQuestion] = useState();

  const { authedUser } = useSelector(authedUserSelector);
  const [pollAuthor, setPollAuthor] = useState();
  const [formattedDate, setFormattedDate] = useState();

  const [selected, setSelected] = useState();
  const [voted, setVoted] = useState();
  const [votedForOptionOne, setVotedForOptionOne] = useState();
  const [votedForOptionTwo, setVotedForOptionTwo] = useState();
  const [didUserAnswerThisPoll, setDidUserAnswerThisPoll] = useState();
  const [totalVotes, setTotalVotes] = useState();

  // save question in state based on id in URL
  useEffect(() => {
    if (status === 'succeeded') {
      // redirect to 404 if poll ID does not exist
      if (!allQuestionIds.includes(getPollIdFromURL)) navigate('/404');
      // set question state to continue setting other variables for UI
      setQuestion(...questions.filter((q) => q.id === getPollIdFromURL));
    }
  }, [status]);

  useEffect(() => {
    // FIRST USEEFFECT
    if (question !== undefined) {
      const pollAuthorId = question.author;
      const author = users.filter((u) => u.id === pollAuthorId)[0];

      setPollAuthor({
        name: author.name,
        id: author.id,
        avatarURL: author.avatarURL
      });

      const date = new Date(question.timestamp);
      setFormattedDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);

      setVotedForOptionOne(question.optionOne.votes.includes(authedUser.id));
      setVotedForOptionTwo(question.optionTwo.votes.includes(authedUser.id));
    }
  }, [question]);

  useEffect(() => {
    // SECOND USEEFFECT
    if (votedForOptionOne !== undefined) {
      setVoted(votedForOptionOne || votedForOptionTwo || null);
    }
  }, [votedForOptionOne]);

  useEffect(() => {
    // THIRD USEEFFECT
    if (voted !== undefined) {
      setSelected(
        // eslint-disable-next-line no-nested-ternary
        voted ? (votedForOptionOne ? 'optionOne' : 'optionTwo') : null
      );

      const optionOneVote = question.optionOne.votes;
      const optionTwoVote = question.optionTwo.votes;
      setTotalVotes(
        optionOneVote.length + optionTwoVote.length !== 0
          ? optionOneVote.length + optionTwoVote.length
          : null
      );

      setDidUserAnswerThisPoll(
        question.optionOne.votes.includes(authedUser.id) === true ||
          question.optionTwo.votes.includes(authedUser.id) === true
          ? 'answered'
          : 'unanswered'
      );

      setPollData({
        q: question,
        author: authedUser.id,
        voteAnswered: didUserAnswerThisPoll
      });
    }
  }, [voted]);

  const handleClick = (selection, e) => {
    e.preventDefault();
    if (selection === 'optionOne') {
      setVotedForOptionOne((prevAnswer) => !prevAnswer);
    }
    if (selection === 'optionTwo') {
      setVotedForOptionTwo((prevAnswer) => !prevAnswer);
    }
    setSelected(selection);
    const submission = {
      authedUser: authedUser.id,
      qid: question.id,
      answer: selection
    };
    dispatch(vote(submission));
    setVoted('answered');
  };

  return (
    <>
      <NavBar />
      <Container className="mt-5 mb-2" style={{ maxWidth: '750px' }}>
        <div className="mt-5 mb-2">
          <h2 className="mb-3">Poll page</h2>
        </div>
        {status === 'loading' ? (
          <Spinner animation="border" />
        ) : (
          <>
            {pollAuthor !== undefined ? (
              <PollHeader pollAuthor={pollAuthor} formattedDate={formattedDate} />
            ) : null}

            {/* Unanswered Poll question UI */}
            {selected === null ? (
              <UnansweredPoll
                handleClick={handleClick}
                votedForOptionOne={votedForOptionOne}
                votedForOptionTwo={votedForOptionTwo}
                question={question}
              />
            ) : (
              <AnsweredPoll
                votedForOptionOne={votedForOptionOne}
                votedForOptionTwo={votedForOptionTwo}
                question={question}
                pollData={pollData}
              />
            )}

            {/* Statistics */}
            <div className="mt-5">
              {selected === null || selected === undefined ? (
                <p>
                  Please note: you can only vote once and are not allowed to change your answer.
                </p>
              ) : (
                <>
                  <PollStatistics question={question} selected={selected} totalVotes={totalVotes} />

                  <Button variant="light" className="mt-5">
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                      {' '}
                      ⬅️ Return to dashboard{' '}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default Poll;
