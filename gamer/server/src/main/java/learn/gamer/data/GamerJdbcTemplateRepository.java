package learn.gamer.data;

import learn.gamer.data.mappers.GamerMapper;
import learn.gamer.models.Game;
import learn.gamer.models.Gamer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class GamerJdbcTemplateRepository implements GamerRepository {
    private final JdbcTemplate jdbcTemplate;
    public GamerJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Gamer> findAll() {
        final String sql = "select gamer_id, app_user_id, gender_type, gamer_tag, birth_date, bio "
                + "from gamer "
                + "order by gamer_tag;";
        return jdbcTemplate.query(sql, new GamerMapper());
    }

    @Override
    public Gamer findByGamerId(int gamerId) {
        final String sql = "select gamer_id, app_user_id, gender_type, gamer_tag, birth_date, bio "
                + "from gamer "
                + "where gamer_id = ?;";

        return jdbcTemplate.query(sql, new GamerMapper(), gamerId)
                .stream().findFirst().orElse(null);
    }

    @Override
    public List<Gamer> findByGameTitle(String gameTitle) {
        final String sql = "select gr.gamer_id, gr.app_user_id, gr.gender_type, gr.gamer_tag, gr.birth_date, gr.bio "
                + "from game g "
                + "inner join gamer_game grg on grg.game_id = g.game_id "
                + "inner join gamer gr on grg.gamer_id = gr.gamer_id "
                + "where g.game_title = ? "
                + "order by gr.gamer_tag asc;";
        return jdbcTemplate.query(sql, new GamerMapper(), gameTitle);
    }

    @Override
    public List<Gamer> findByGameId(int gameId) {
        final String sql = "select gr.gamer_id, gr.app_user_id, gr.gender_type, gr.gamer_tag, gr.birth_date, gr.bio "
                + "from game g "
                + "inner join gamer_game grg on grg.game_id = g.game_id "
                + "inner join gamer gr on grg.gamer_id = gr.gamer_id "
                + "where g.game_id = ? "
                + "order by gr.gamer_tag asc;";
        return jdbcTemplate.query(sql, new GamerMapper(), gameId);
    }

    @Override
    public Gamer create(Gamer gamer) {
        final String sql = "insert into gamer (app_user_id, gender_type, gamer_tag, birth_date, bio) "
                + "value (?,?,?,?,?);";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, gamer.getAppUserId());
            ps.setString(2, gamer.getGenderType().toString());
            ps.setString(3, gamer.getGamerTag());
            ps.setDate(4, gamer.getBirthDate() == null ? null : Date.valueOf(gamer.getBirthDate()));
            ps.setString(5, gamer.getBio());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        gamer.setGamerId(keyHolder.getKey().intValue());
        return gamer;
    }

    @Override
    @Transactional
    public boolean update(Gamer gamer) {
        final String sql = "update gamer set "
                + "gender_type = ?, "
                + "gamer_tag = ?, "
                + "birth_date = ?, "
                + "bio = ? "
                + "where gamer_id = ?;";
        return jdbcTemplate.update(sql,
                gamer.getGenderType().toString(),
                gamer.getGamerTag(),
                gamer.getBirthDate(),
                gamer.getBio(),
                gamer.getGamerId()) > 0;
    }
}
