import BlockManager from "./components/BlockManager";
import SubjectManager from "./components/SubjectManager";
import QuestionManager from "./components/QuestionManager";
import ExamGenerator from "./components/ExamGenerator";
import ExamList from "./components/ExamList";

import "./style.less";

export default function App() {
return (
    <div className="th02-container">
    <h1 className="th02-title">Ngân hàng câu hỏi tự luận</h1>

    <div className="manager-section">
        <BlockManager />
    </div>
    <div className="manager-section">
        <SubjectManager />
    </div>
    <div className="manager-section">
        <QuestionManager />
    </div>
    <div className="manager-section">
        <ExamGenerator />
    </div>
    <div className="manager-section">
        <ExamList />
    </div>
    </div>
);
}