package learn.gamer.data;

import learn.gamer.models.MatchSent;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MatchSentJdbcTemplateRepository implements MatchSentRepository {
    private final JdbcTemplate jdbcTemplate;

    public MatchSentJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(MatchSent matchSent) {
        // "sending a match" to someone means creating a new match
        final String sql = "insert into `match` (gamer_receiver_id, gamer_sender_id, date_match) "
                + "values (?,?,?);";
        return jdbcTemplate.update(sql,
                matchSent.getGamerReceiver().getGamerId(),
                matchSent.getGamerSenderId(),
                matchSent.getDateMatchSent()) > 0;
    }

    @Override
    public boolean deleteByKey(int matchReceiverId, int matchSenderId) {
        final String sql = "delete from `match` "
                + "where gamer_receiver_id = ? and gamer_sender_id = ?;";
        return jdbcTemplate.update(sql, matchReceiverId, matchSenderId) > 0;
    }
}
