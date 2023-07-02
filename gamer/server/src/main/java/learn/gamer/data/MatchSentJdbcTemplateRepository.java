package learn.gamer.data;

import learn.gamer.models.MatchSent;
import org.springframework.jdbc.core.JdbcTemplate;

public class MatchSentJdbcTemplateRepository implements MatchSentRepository {
    private final JdbcTemplate jdbcTemplate;

    public MatchSentJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(MatchSent matchSent) {
        // send a match to someone
        final String sql = "insert into `match` (gamer_receiver_id, gamer_sender_id, date_match) "
                + "values (?,?,?);";
        return jdbcTemplate.update(sql,
                matchSent.getGamerSenderId(),
                matchSent.getGamerReceiver().getGamerId()) > 0;
    }

    @Override
    public boolean deleteByKey(int matchSenderId, int matchReceiverId) {
        final String sql = "delete from `match` "
                + "where gamer_sender_id = ? and gamer_receiver_id = ?;";
        return jdbcTemplate.update(sql, matchSenderId, matchReceiverId) > 0;
    }
}
